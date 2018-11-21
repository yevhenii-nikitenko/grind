import cluster from 'cluster';
import app from './app';
import os from 'os';
import config from './config/config';

if (cluster.isMaster) {
    const cpus: number = os.cpus().length;
    for (let i = 0; i < cpus; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log(`worker ${worker.id} exited, respawning...`);
        cluster.fork();
    });
} else {
    app.listen(config.app.port, config.app.host, () => {
        console.log(`worker ${cluster.worker.id} is working on port ${config.app.port}...`);
    });
}

export = app; 