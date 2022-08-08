import app from './app';
import * as http from 'http';
const PORT = process.env.PORT||3000;
const server = http.createServer(app);

server.listen(PORT,()=>{
    const timeZone = +5, 
    serverRunTime = new Date( new Date().getTime() + timeZone * 3600 * 1000).toUTCString().replace( / GMT$/, "" );

    console.log("Happy Server is running on port: "+PORT + " ---> "+ serverRunTime);
})