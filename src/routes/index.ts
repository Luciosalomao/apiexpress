import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

function loadRoutes(dir: string) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      loadRoutes(fullPath);
    }

    if (
      stat.isFile() &&
      (file.endsWith(".routes.ts") || file.endsWith(".routes.js"))
    ) {
      const route = require(fullPath);
      const routeModule = route.default || route;

      const relativePath = path
        .relative(__dirname, fullPath)
        .replace(/\\/g, "/");
      const cleanPath = relativePath
        .replace(".routes.ts", "")
        .replace(".routes.js", "");

      // Remove duplicidade: exemplo "db/db" vira apenas "db"
      const pathParts = cleanPath.split("/");
      const lastPart = pathParts[pathParts.length - 1];

      const routeBase =
        "/" +
        pathParts
          .filter(
            (part, idx) => idx === pathParts.length - 1 || part !== lastPart
          )
          .join("/")
          .replace(/index$/, "") // remove /index se for o nome do arquivo
          .replace(/\/$/, ""); // remove barra final se existir

      console.log("Registrando rota:", routeBase);
      router.use(routeBase, routeModule);
    }
  });
}

loadRoutes(__dirname);

export default router;
