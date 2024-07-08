const axios = require('axios');
const ical = require('node-ical');

class ICSParser {
  async downloadICS(url) {
    try {
      const response = await axios.get(url, { responseType: 'text' });

      if (response.status !== 200) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      return response.data;
    } catch (error) {
      throw new Error(`Error in downloadICS: ${error.message}`);
    }
  }

  parseICS(data) {
    try {
      const events = ical.sync.parseICS(data);

      for (const event of Object.values(events)) {
        if (event.type === 'VEVENT') {
          console.log(
            'Summary: ' + event.summary +
            '\nDescription: ' + event.description +
            '\nStart Date: ' + (event.start ? event.start.toISOString() : 'N/A') +
            '\n'
          );
        }
      }
    } catch (error) {
      throw new Error(`Error in parseICS: ${error.message}`);
    }
  }
}

module.exports = ICSParser;
