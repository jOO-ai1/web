       {/* Coupon */}
       <div className="mb-6">
-        <div className="flex gap-2 mb-2">
+        <div className="flex flex-col sm:flex-row gap-2 mb-2">
           <input
-            className="glass border border-[#d1b16a]/40 px-3 py-2 rounded-lg flex-1 font-montserrat"
+            className="glass border border-[#d1b16a]/40 px-3 py-2 rounded-lg flex-1 font-montserrat min-h-[44px]"
             placeholder={lang === 'ar' ? "أدخل كود الكوبون" : "Enter coupon code"}
             value={coupon}
             onChange={e => setCoupon(e.target.value)}
@@ -40,7 +40,7 @@ export default function CartSummary() {
           <GlassButton 
             onClick={handleApplyCoupon} 
             disabled={!!applied}
}
-            className="px-4"
+            className="px-4 w-full sm:w-auto"
           >
             {applied ? t("applied") : t("applyCoupon")}
           </GlassButton>