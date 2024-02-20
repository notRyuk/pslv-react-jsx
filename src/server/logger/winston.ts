import path from "path";
import winston from "winston";

const level = () => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};

winston.addColors({
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "magenta",
    debug: "white",
});

const logger = winston.createLogger({
    level: level(),
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    format: winston.format.combine(
        winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            maxsize: 5*1024*1024,
            filename: path.join(
                __dirname, 
                "..", "..", 
                "..", "logs", 
                `access.log.jsonl`
            ),
            zippedArchive: true,
            tailable: true,
            maxFiles: 1,
            format: winston.format.combine(
                winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),
                winston.format.json({
                    maximumDepth: 4
                })
            )
        })
    ]
});

export default logger;