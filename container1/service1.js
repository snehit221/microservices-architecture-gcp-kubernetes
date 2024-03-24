const express = require('express');
const app = express();
const port = 6000;
const fs = require('fs');  // using file system for validation purposes
const axios = require('axios');
app.use(express.json());

app.get('/welcome', (req, res) => {
    res.send('Hello, World! Welcome Page');
});

app.get('/', (req, res) => {
    res.send('Hello, Home Page!! Trigger 2 after code change for CI CD');
});


app.post('/store-file', async (req, res) => {
    const jsonData = req.body;
    const fileName = jsonData.file;
    const fileData = jsonData.data;

    if (!jsonData || jsonData.file === undefined || jsonData.file === null) {
        return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
    }

    const filePath = '/snehit_PV_dir/' + fileName

    fs.writeFile(filePath, fileData, function (err) {
        if (err) {
            console.error('Error while storing the file:', err);
            return res.status(500).json({ file: fileName, error: 'Error while storing the file to the storage.' });
        }

        return res.status(200).json({ file: fileName, message: 'Success.' });

    });
});

app.post('/calculate', async (req, res) => {
    const jsonData = req.body;

    if (!jsonData || jsonData.file === undefined) {
        return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
    }

    // check if the file name in req exists, if yes, return found else say not found
    const fileName = jsonData.file;
    if (fileName === null) {
        return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
    }

    const filePath = '/snehit_PV_dir/' + fileName
    fs.access(filePath,fs.constants.F_OK, async (err) => {
        if (err) {
            // File does not exist
            return res.status(404).json({ file: fileName, error: 'File not found.' });
        }
        
        try {
            // Make HTTP POST request using axios and wait for it to complete
            const response = await axios.post('http://service2-service:3000/calculate-product-sum', req.body);
            
            console.log('POST Request Successful:', response.data);

            res.json(response.data);
        } catch (error) {
            console.error('POST Request Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

app.listen(port, () => {
    console.log(`Gatekeeper Service App1 listening at http://localhost:${port}`);
});

