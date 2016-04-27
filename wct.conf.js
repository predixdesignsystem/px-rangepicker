module.exports = {
  verbose: false,
  plugins: {
    local: {
        browsers: ['chrome', 'firefox']
    },
    sauce: {
      disabled: true,
      "browsers": [{
          "browserName": "microsoftedge",
          "platform": "Windows 10",
          "version": "",
          "timeZone": "Los Angeles"
        }, {
          "browserName": "internet explorer",
          "platform": "Windows 8.1",
          "version": "11",
          "timeZone": "Los Angeles"
        },
        {
          "browserName": "safari",
          "platform": "OS X 10.11",
          "version": "9",
          "timeZone": "Los Angeles"
        }, {
          "browserName": "safari",
          "platform": "OS X 10.10",
          "version": "8",
          "timeZone": "Los Angeles"
        }
      ]
    }
  }
};
