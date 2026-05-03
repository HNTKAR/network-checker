import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function GET(): Promise<Response> {
  return await new Promise((resolve) => {
    const py = spawn("python3", ["./app/api/judge/judge.py"]);
    let data = "";
    let error = "";
    py.stdout.on("data", (chunk) => {
      data += chunk;
    });
    py.stderr.on("data", (chunk) => {
      error += chunk;
    });
    py.on("close", (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(data);
          resolve(NextResponse.json(result));
        } catch (e) {
          resolve(NextResponse.json({ error: "Python出力のJSONパース失敗" }));
        }
      } else {
        resolve(NextResponse.json({ error: error || "Python実行エラー" }));
      }
    });
  });
}
