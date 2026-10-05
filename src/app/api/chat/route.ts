import { NextResponse } from "next/server";
import { chatbotService } from "@/services/chatbot.service";
import { clientIp, jsonBody, tooMany } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

/** POST /api/chat { message, context: { majorId?, schoolId?, riasec? } } */
export async function POST(req: Request) {
  const { body, error } = await jsonBody<{ message?: unknown; context?: Record<string, unknown> }>(req, 8 * 1024);
  if (error) return error;
  const ip = clientIp(req);
  const wait = Math.max(rateLimit(`chat:min:${ip}`, 20, 60), rateLimit(`chat:day:${ip}`, 300, 86400));
  if (wait) return tooMany(wait);
  const ctx = body?.context && typeof body.context === "object" ? body.context : {};
  try {
    const result = await chatbotService.ask(body?.message, { majorId: ctx.majorId, schoolId: ctx.schoolId, riasec: ctx.riasec, page: ctx.page });
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (e) {
    // Lỗi ngoài dự kiến: ghi log phía server, trả JSON rõ ràng (không lộ chi tiết lỗi cho người dùng).
    console.error("[trovio:chat] lỗi khi trả lời:", e);
    return NextResponse.json({ ok: false, message: "Trợ lý gặp sự cố khi tra cứu dữ liệu. Bạn thử lại, nếu vẫn lỗi hãy báo cho quản trị viên." }, { status: 500 });
  }
}
