const OrderProcessSteps = () => {
  return (
    <div className="mt-8 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50/80 to-emerald-50/50 backdrop-blur-sm p-8 md:p-6 sm:p-5">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-green-900 mb-6 md:text-lg sm:text-base">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
          📋
        </div>
        How Our Order Process Works
      </h3>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white font-bold text-sm">
            1
          </div>
          <div>
            <h4 className="font-bold text-green-900 mb-1">Go to WhatsApp</h4>
            <p className="text-sm text-green-700">
              Click "Place Order" to open WhatsApp with your order details
              pre-filled
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white font-bold text-sm">
            2
          </div>
          <div>
            <h4 className="font-bold text-green-900 mb-1">Pay via UPI</h4>
            <p className="text-sm text-green-700">
              Share your details and we'll send you a UPI QR. Choose from
              multiple payment options
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white font-bold text-sm">
            3
          </div>
          <div>
            <h4 className="font-bold text-green-900 mb-1">Track in WhatsApp</h4>
            <p className="text-sm text-green-700">
              Once payment is confirmed, receive order confirmation and track
              your delivery directly with our WhatsApp page
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-white/60 border border-green-200">
        <p className="text-sm text-green-800">
          <span className="font-bold">✓</span> Fast & Secure |{" "}
          <span className="font-bold">✓</span> Real-time Updates |{" "}
          <span className="font-bold">✓</span> Direct Support
        </p>
      </div>
    </div>
  );
};
export default OrderProcessSteps;
