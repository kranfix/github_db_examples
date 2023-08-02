"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres = require("postgres");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
function runServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
        const db = (0, migrator_1.migrate)((0, postgres_js_1.drizzle)(client), { migrationsFolder: "drizzle" });
        //const allUsers = await db.select().from(accounts);
        //console.log(allUsers);
    });
}
