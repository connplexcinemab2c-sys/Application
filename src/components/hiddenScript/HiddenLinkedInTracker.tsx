// import React, {useRef} from 'react';
// import {View} from 'react-native';
// import {WebView} from 'react-native-webview';

// const HiddenLinkedInTracker: React.FC = () => {
//   const webViewRef = useRef(null);

//   const linkedInScript = `
//     (function() {
//       var _linkedin_partner_id = "8132433";
//       window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
//       window._linkedin_data_partner_ids.push(_linkedin_partner_id);

//       var s = document.getElementsByTagName("script")[0];
//       var b = document.createElement("script");
//       b.type = "text/javascript"; b.async = true;
//       b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
//       s.parentNode.insertBefore(b, s);

//       // NoScript tracking
//       var img = document.createElement("img");
//       img.height = 1; img.width = 1; img.style.display = "none";
//       img.src = "https://px.ads.linkedin.com/collect/?pid=8132433&fmt=gif";
//       document.body.appendChild(img);
//     })();
//     true;
//   `;

//   return (
//     <View style={{width: 0, height: 0}}>
//       <WebView
//         ref={webViewRef}
//         originWhitelist={['*']}
//         source={{
//           html: `<html><head><script>${linkedInScript}</script></head></html>`,
//         }}
//         injectedJavaScript={linkedInScript}
//         javaScriptEnabled
//         domStorageEnabled
//         onLoad={() => console.log('LinkedIn tracking script executed')}
//       />
//     </View>
//   );
// };

// export default HiddenLinkedInTracker;
import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const HiddenTracker: React.FC = () => {
  const trackingScripts = `
    (function() {
      // LinkedIn Tracking Script
      var _linkedin_partner_id = "8132433";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);

      var linkedInScript = document.createElement("script");
      linkedInScript.type = "text/javascript";
      linkedInScript.async = true;
      linkedInScript.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      document.head.appendChild(linkedInScript);

      var linkedInImg = document.createElement("img");
      linkedInImg.height = 1;
      linkedInImg.width = 1;
      linkedInImg.style.display = "none";
      linkedInImg.src = "https://px.ads.linkedin.com/collect/?pid=8132433&fmt=gif";
      document.body.appendChild(linkedInImg);

      // Facebook Pixel Tracking Script
      !function(f,b,e,v,n,t,s) {
        if(f.fbq) return; n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments);
        };
        if(!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = document.createElement(e);
        t.async = !0;
        t.src = v;
        s = document.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

      fbq("init", "6508800482572571");
      fbq("track", "PageView");

      var fbImg = document.createElement("img");
      fbImg.height = 1;
      fbImg.width = 1;
      fbImg.style.display = "none";
      fbImg.src = "https://www.facebook.com/tr?id=6508800482572571&ev=PageView&noscript=1";
      document.body.appendChild(fbImg);
    })();
    true;
  `;

  return (
    <View style={{width: 0, height: 0}}>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `<html><head><script>${trackingScripts}</script></head></html>`,
        }}
        injectedJavaScript={trackingScripts}
        javaScriptEnabled
        domStorageEnabled
        onLoad={() => console.log('Tracking scripts executed')}
      />
    </View>
  );
};

export default HiddenTracker;
