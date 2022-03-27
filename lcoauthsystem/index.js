const app = require('./app');
const {PORT} = process.env // Same as process.env.port 

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    
})


