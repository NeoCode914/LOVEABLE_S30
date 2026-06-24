import { prisma } from '@repo/db';
import express from 'express'

const PORT = process.env.PORT ?? 3001
const app = express()
app.use(express.json())

app.get("/health", (_, res) => {
  res.json("HALVA_POORI");
});

const user = prisma.user.findUnique({
  where: {
    id : "MAYANK"
  }
})

app.listen(PORT, () => {
  console.log("WELCOME TO THE NEW WORLD")
})