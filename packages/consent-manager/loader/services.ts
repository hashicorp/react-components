export default {
  googleAnalytics: {
    name: 'Google Analytics',
    description:
      'Google Analytics is a popular service for tracking web traffic. We use this data to determine what content our users find important so that we can dedicate more resources toward improving what matters most.',
    category: 'Analytics',
  },
  googleTagManager: {
    name: 'Google Tag Manager',
    description:
      'Google Tag Manager allows us to see how effective our advertising campaigns have been by measuring how many users arrived at our site via external advertisements for HashiCorp services. It is also used for the Google Optimize service, which performs A/B tests designed to optimize the usability of our websites.',
    category: 'Analytics',
  },
  linkedIn: {
    name: 'LinkedIn Insight Tag',
    description:
      'This small script allows us to see how effective our LinkedIn campaigns are by measuring how many users have clicked prompts on LinkedIn to arrive at our site.',
    category: 'Advertising',
  },
  heap: {
    name: 'Heap',
    description:
      'Heap is an analytics tool that is used to track interaction with specific elements on websites, like menus or buttons in sequence, as opposed to tracking overall pageviews like Google Analytics. We use this to test our user experience and ensure that people are able to find what they are looking for on our websites.',
    category: 'Analytics',
  },
  marketo: {
    name: 'Marketo V2',
    description:
      'Marketo is a marketing automation tool that allows us to segment users into different categories based off of their behaviors. We use this information to provide tailored information to users in our email campaigns.',
    category: 'Email Marketing',
  },
  optinMonster: {
    name: 'OptinMonster',
    description:
      'OptinMonster is a service that we use to show notifications about new content and upcoming events that are relevant to the content you are looking at.',
    category: 'Functional',
    body: `var om598c8e3a6e43d,om598c8e3a6e43d_poll=function(){var r=0;return function(n,l){clearInterval(r),r=setInterval(n,l)}}();!function(e,t,n){if(e.getElementById(n)){om598c8e3a6e43d_poll(function(){if(window['om_loaded']){if(!om598c8e3a6e43d){om598c8e3a6e43d=new OptinMonsterApp();return om598c8e3a6e43d.init({"s":"35109.598c8e3a6e43d","staging":0,"dev":0,"beta":0});}}},25);return;}var d=false,o=e.createElement(t);o.id=n,o.src="https://a.optnmstr.com/app/js/api.min.js",o.async=true,o.onload=o.onreadystatechange=function(){if(!d){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){try{d=om_loaded=true;om598c8e3a6e43d=new OptinMonsterApp();om598c8e3a6e43d.init({"s":"35109.598c8e3a6e43d","staging":0,"dev":0,"beta":0});o.onload=o.onreadystatechange=null;}catch(t){}}}};(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(o)}(document,"script","omapi-script");`,
  },
  bizible: {
    name: 'Bizible',
    description:
      "Bizible is a service that aids with the company's marketing efforts by measuring and tracking the impact of our advertising campaigns.",
    category: 'Advertising',
    url: `//cdn.bizible.com/scripts/bizible.js`,
    async: true,
  },
  engagio: {
    name: 'Engagio',
    description:
      "Engagio is a service that aids with the company's marketing efforts by estimating the types of visitors that are using our website and the way they move through it, allowing us to optimize content to best fit expectations.",
    category: 'Advertising',
    body: `var _eiq = _eiq || [];var _engagio_settings = {accountId: "a44336530751c27cca1d8124d3f1ad1867bb0c93"};(function() {var ei = document.createElement('script'); ei.type = 'text/javascript'; ei.async = true;ei.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'web-analytics.engagio.com/js/ei.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ei, s);})();`,
  },
  googleAds: {
    name: 'Google Ads (Gtag)',
    description:
      'This script keeps track of whether those who have clicked on advertisements for HashiCorp services we have run through google have clicked and arrived successfully on our website.',
    category: 'Advertising',
  },
}
