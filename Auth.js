// auth.js
/**
 * Crea un middleware de Telegraf que permite solo ciertos chat IDs.
 * @param {Array<string|number>} allowedIds 
 */
export function createAuthMiddleware(allowedIds = []) {
  const set = new Set((allowedIds || []).map(String));
  return async (ctx, next) => {
    const id = String(ctx.chat?.id || ctx.from?.id || "");
    if (!set.has(id)) {
      try { await ctx.reply("❌ No estás autorizado para usar este bot."); } catch(e){}
      // si es callback query, respondemos para quitar el spinner en el cliente
      try { await ctx.answerCbQuery?.("No autorizado", { show_alert: true }); } catch(e){}
      return; // NO llamamos next()
    }
    return next();
  };
}
