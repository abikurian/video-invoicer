"use client";

import { useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";

export default function Home() {
  const [details, setDetails] = useState({
    clientName: "Acme Corp",
    projectName: "Fuginiz Promo Video",
    date: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState([
    { id: 1, description: "Sony a7 IV + Lenses (Day Rate)", rate: 15000, qty: 1 },
    { id: 2, description: "DaVinci Resolve Color Grading (Hours)", rate: 1500, qty: 5 },
  ]);

  const calculateTotal = () => items.reduce((sum, item) => sum + (item.rate * item.qty), 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT PANEL: INPUT CONTROLS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <FileText className="text-indigo-500 w-6 h-6" />
            <h1 className="text-2xl font-bold tracking-tight">Invoice Builder</h1>
          </div>

          <div className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Client Name</label>
              <input
                type="text"
                value={details.clientName}
                onChange={(e) => setDetails({ ...details, clientName: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Project Title</label>
              <input
                type="text"
                value={details.projectName}
                onChange={(e) => setDetails({ ...details, projectName: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: LIVE PREVIEW (Looks like physical paper) */}
        <div className="lg:col-span-7">
          <div className="bg-white text-zinc-900 p-10 rounded-sm shadow-2xl min-h-[700px]">
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b-2 border-zinc-100 pb-8 mb-8">
              <div>
                <h2 className="text-4xl font-black text-zinc-950 tracking-tighter">INVOICE</h2>
                <p className="text-sm text-zinc-500 mt-1">INV-{Math.floor(Math.random() * 10000)}</p>
              </div>
              <div className="text-right text-sm space-y-1">
                <p className="font-bold text-zinc-900">Abi Kurian Varghese</p>
                <p className="text-zinc-500">Video Production & Grading</p>
                <p className="text-zinc-500">Kochi, Kerala</p>
              </div>
            </div>

            {/* Client Info */}
            <div className="flex justify-between mb-10 text-sm">
              <div>
                <p className="text-zinc-500 mb-1">Bill To:</p>
                <p className="font-bold text-zinc-900 text-base">{details.clientName || "Client Name"}</p>
                <p className="text-zinc-500">{details.projectName || "Project Title"}</p>
              </div>
              <div className="text-right">
                <p className="text-zinc-500 mb-1">Date:</p>
                <p className="font-medium text-zinc-900">{details.date}</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="w-full text-sm">
              <div className="grid grid-cols-12 gap-4 font-bold text-zinc-400 border-b border-zinc-200 pb-2 mb-4">
                <div className="col-span-7">Description</div>
                <div className="col-span-2 text-right">Rate</div>
                <div className="col-span-1 text-center">Qty</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 py-3 border-b border-zinc-100">
                  <div className="col-span-7 font-medium text-zinc-900">{item.description}</div>
                  <div className="col-span-2 text-right text-zinc-600">₹{item.rate.toLocaleString()}</div>
                  <div className="col-span-1 text-center text-zinc-600">{item.qty}</div>
                  <div className="col-span-2 text-right font-bold text-zinc-900">₹{(item.rate * item.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-end mt-8">
              <div className="w-1/2 bg-zinc-50 p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-black">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}