
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/judge")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setResult(data);
        }
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full max-w-xl items-center justify-center py-20 px-4 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-8 text-black dark:text-zinc-50">ネットワーク情報チェック</h1>
        <table className="w-full border border-zinc-200 dark:border-zinc-700 text-left mb-8">
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-2 px-4 bg-zinc-100 dark:bg-zinc-800">現在のグローバルIPアドレス</th>
              <td className="py-2 px-4">{result?.global_ip ?? "取得中..."}</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-2 px-4 bg-zinc-100 dark:bg-zinc-800">現在のローカルIPアドレス</th>
              <td className="py-2 px-4">{result?.local_ip ?? "取得中..."}</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-2 px-4 bg-zinc-100 dark:bg-zinc-800">現在のDNSサーバー</th>
              <td className="py-2 px-4">{result?.dns_server ?? "取得中..."}</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-2 px-4 bg-zinc-100 dark:bg-zinc-800">DNSサーバーのアクセス可否</th>
              <td className="py-2 px-4">{result?.dns_access ?? "判定中..."}</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-2 px-4 bg-zinc-100 dark:bg-zinc-800">現在のルーター</th>
              <td className="py-2 px-4">{result?.router_ip ?? "取得中..."}</td>
            </tr>
            <tr>
              <th className="py-2 px-4 bg-zinc-100 dark:bg-zinc-800">ルーターのアクセス可否</th>
              <td className="py-2 px-4">{result?.router_access ?? "判定中..."}</td>
            </tr>
          </tbody>
        </table>
        {error && (
          <div className="text-red-500 mt-2">エラー: {error}</div>
        )}
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          ※ 一部環境ではローカルIPが取得できない場合があります。
        </div>
      </main>
    </div>
  );
}
