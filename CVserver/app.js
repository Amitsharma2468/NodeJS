const http = require("http"); 
const fs = require('fs').promises; 
const path = require('path'); 
 
 
const host = 'localhost'; 
const port = 3000; 
 
const requestListener = function (req, res) { 
    let filePath = path.join(__dirname, req.url === '/' ? 'resume.html' : req.url); 
 
    let contentType = 'text/html'; 
 
    const ext = path.extname(filePath); 
    if (ext === '.css') { 
        contentType = 'text/css'; 
    } else if (ext === '.jpg') { 
        contentType = 'image/jpg'; 
    } 
    
 
    fs.readFile(filePath) 
        .then(contents => { 
            res.writeHead(200, {'Content-Type': contentType}); 
            res.end(contents); 
        }) 
        .catch(err => { 
            res.writeHead(404); 
            res.end(`File not found: ${err}`); 
        }); 
}; 
 
const server = http.createServer(requestListener); 
server.listen(port, host, () => { 
    console.log(`Server is running on http://${host}:${port}`); 
});