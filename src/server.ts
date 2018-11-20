import cluster from 'cluster';
import app from './app';

const PORT: number = 2323

if (cluster.isMaster) {
    const cpus: number = require('os').cpus().length;
    for (let i = 0; i < cpus; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log(`worker ${worker.id} exited, respawning...`);
        cluster.fork();
    });
} else {
    app.listen(PORT, () => {
        console.log(`worker ${cluster.worker.id} is working on port ${PORT}...`);
    });
}

export = app; 