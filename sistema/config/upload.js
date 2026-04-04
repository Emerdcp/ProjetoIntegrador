const multer = require("multer");
const path = require("path");
const fs = require("fs");

const pasta = path.join(__dirname, "../../uploads/produtos");

// cria pasta se não existir
if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pasta);
    },
    filename: (req, file, cb) => {
        const nome = Date.now() + "-" + file.originalname;
        cb(null, nome);
    }
});

const upload = multer({ storage });

module.exports = upload;