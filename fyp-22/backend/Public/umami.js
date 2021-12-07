// import { doNotTrack, hook } from "../lib/web";
// import { removeTrailingSlash } from "../lib/url";

(async (window) => {
  const {
    screen: { width, height },
    navigator: { language },
    location: { hostname, pathname, search },
    localStorage,
    sessionStorage,
    document,
    history,
  } = window;

  const script = document.querySelector("script[data-website-id]");

  function removeTrailingSlash(url) {
    return url && url.length > 1 && url.endsWith("/") ? url.slice(0, -1) : url;
  }

  const urlSearchParams = new URLSearchParams(window.location.search);
  const { affiliate_id } = Object.fromEntries(urlSearchParams.entries());
  if (affiliate_id) {
    window.localStorage.setItem("affiliate_id", affiliate_id);
  }

  console.log("value of pathname", pathname);

  console.log(
    "vlaue of aaffiliate id",
    window.localStorage.getItem("affiliate_id")
  );
  console.log("Value of path", pathname);

  async function getlocation() {
    const res = await fetch(
      "https://api.freegeoip.app/json?apikey=214b1240-3710-11ec-856d-bb3e4f99a06e"
    );
    const data = await res.json();
    return data;
  }
  const dat = await getlocation();

  if (!script) return;

  const attr = (key) => script && script.getAttribute(key);
  console.log("value of attr", attr);
  const website = attr("data-website-id");
  const hostUrl = attr("data-host-url");
  const autoTrack = attr("data-auto-track") !== "false";
  const dnt = attr("data-do-not-track");
  const useCache = attr("data-cache");
  const domains = attr("data-domains");

  // const disableTracking =
  //   localStorage.getItem("umami.disabled") ||
  //   (dnt && doNotTrack()) ||
  //   (domains &&
  //     !domains
  //       .split(",")
  //       .map((n) => n.trim())
  //       .includes(hostname));

  const root = hostUrl
    ? removeTrailingSlash(hostUrl)
    : script.src.split("/").slice(0, -1).join("/");
  const screen = `${width}x${height}`;
  const listeners = [];
  let currentUrl = `${pathname}${search}`;
  let currentRef = document.referrer;

  function Integration() {
    const Int_status = window.localStorage.getItem("Int_Status");
    console.log("status", Int_status);
    if (!Int_status) {
      window.localStorage.setItem("Int_Status", true);
      fetch(`${root}/website/inegration/${website}`);
    }
  }
  Integration();

  /* Collect metrics */

  const post = (url, data, callback) => {
    const req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");

    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        callback && callback(req.response);
      }
    };

    req.send(JSON.stringify(data));
  };

  const collect = (type, params, uuid) => {
    // if (disableTracking) return;

    const key = "umami.cache";

    console.log(dat.city, dat.country_name);
    const payload = {
      website: uuid,
      hostname,
      country: dat.country_name,
      city: dat.city,
      affiliate_id: affiliate_id,
      cache: useCache && sessionStorage.getItem(key),
    };

    if (params) {
      Object.keys(params).forEach((key) => {
        payload[key] = params[key];
      });
    }
    if (
      (window.localStorage.getItem("affiliate_id") &&
        pathname.match("thank-you")) ||
      pathname.match("thank_you") ||
      pathname.match("thankyou")
    ) {
      var affiliate = window.localStorage.getItem("affiliate_id");
      var product_name = [
        ...document.querySelectorAll(".jvsea__product__name"),
      ].map((item) => item.innerHTML);

      var product_quantity = [
        ...document.querySelectorAll(".jvsea__product__quantity"),
      ].map((item) => item.innerHTML.split(";")[1]);

      var product_price = [
        ...document.querySelectorAll(".jvsea__product__price"),
      ].map((item) => item.innerText.substring(2, item.innerText.length));

      product_price.shift();

      var productdata = [];

      console.log("data value", product_name, product_price, product_quantity);

      for (var i = 0; i < product_name.length; i++) {
        var data = {};

        data.name = product_name[i];
        data.qty = product_quantity[i];
        data.price = product_price[i];
        productdata.push(data);
      }

      console.log("data", productdata);

      post(
        `${root}/tracker`,
        {
          affiliate_id: affiliate,
          data: productdata,
          orderid:
            document.querySelectorAll(".jvsea__order__id")[0].childNodes[1]
              .innerText,
          type,
          payload,
        },
        (res) => useCache && sessionStorage.setItem(key, res)
      );
    } else {
      if (window.localStorage.getItem("affiliate_id")) {
        var affiliate = window.localStorage.getItem("affiliate_id");
        post(
          `${root}/tracker`,
          {
            affiliate_id: affiliate,
            type,
            payload,
          },
          (res) => useCache && sessionStorage.setItem(key, res)
        );
      }
    }
  };

  const trackView = (url = currentUrl, referrer = currentRef, uuid = website) =>
    collect(
      "pageview",
      {
        url,
        referrer,
      },
      uuid
    );

  const trackEvent = (
    event_value,
    event_type = "custom",
    url = currentUrl,
    uuid = website
  ) =>
    collect(
      "event",
      {
        event_type,
        event_value,
        url,
      },
      uuid
    );

  /* Handle events */

  const addEvents = () => {
    document.querySelectorAll("[class*='umami--']").forEach((element) => {
      element.className.split(" ").forEach((className) => {
        if (/^umami--([a-z]+)--([\w]+[\w-]*)$/.test(className)) {
          const [, type, value] = className.split("--");
          const listener = () => trackEvent(value, type);

          listeners.push([element, type, listener]);
          element.addEventListener(type, listener, true);
        }
      });
    });
  };

  const removeEvents = () => {
    listeners.forEach(([element, type, listener]) => {
      element && element.removeEventListener(type, listener, true);
    });
    listeners.length = 0;
  };

  /* Handle history changes */

  const handlePush = (state, title, url) => {
    if (!url) return;

    removeEvents();

    currentRef = currentUrl;
    const newUrl = url.toString();

    if (newUrl.substring(0, 4) === "http") {
      currentUrl = "/" + newUrl.split("/").splice(3).join("/");
    } else {
      currentUrl = newUrl;
    }

    if (currentUrl !== currentRef) {
      trackView(currentUrl, currentRef);
    }

    setTimeout(addEvents, 300);
  };

  /* Global */

  if (!window.umami) {
    const umami = (event_value) => trackEvent(event_value);
    umami.trackView = trackView;
    umami.trackEvent = trackEvent;
    umami.addEvents = addEvents;
    umami.removeEvents = removeEvents;

    window.umami = umami;
  }

  /* Start */

  if (autoTrack) {
    // history.pushState = hook(history, "pushState", handlePush);
    // history.replaceState = hook(history, "replaceState", handlePush);

    trackView(currentUrl, currentRef);

    addEvents();
  }
})(window);
