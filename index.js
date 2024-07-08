const ICSParser = require('./src/services/ics');

const url = 'https://api.lufthansa.com/mytime/mytime/rostershareinfo/downloadRoster?api_key=s3ke7asvt3x8ycfg2xr8bhpj&id=3fc8ea71f2654b7883f4fb63fd7255d4';

(async () => {
  const parser = new ICSParser();

  try {
    const icsData = await parser.downloadICS(url);
    parser.parseICS(icsData);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();