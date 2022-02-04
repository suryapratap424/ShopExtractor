# Setting Up
    run - 'npm install'
# Index js 
    to run - 'node ./index.js'
    1. It goes to a specified URL i.e. - 'https://www.fundoodata.com/citiesindustry/3/0/list-of-chemical-companies-in-delhi-ncr'
    2. reads total search results and calculates number of pages i.e. number of requests to be done
    3. we can limit number of requests by changing "i <= pages" => "i <= n(no of pages)"
    3. If the headings are found it makes an array otherwise that page is skipped 
    4. final array is written in './list.js'
# Oneshop js
    !!! BEFORE RUNNING 'list.json' FILE MUST BE IN DIRECTORY !!!
    we can set low and up limit as per requirement for requesting all shops (low = 0 ; up = list.length)
    to run - 'node ./oneshop.js'
    it reads list.js file , requests to all specified url's makes array and appends in 'details.json'
# Csvshop js
    Similar to oneshop.js returns csv(details.csv) file insted of json