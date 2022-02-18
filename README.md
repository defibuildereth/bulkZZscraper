Notes: 
- Requires ZkScanalyzer (https://github.com/defibuildereth/zkscanalyzer) to be running on localhost:3000
- Add relevant addresses to 'addresses' array of bulkScraper.js, saves full history to a new directory created with current timestamp
- Sorts through these histories to total up each token, console logs result
- Use crontab or launchd to run automatically every X time