"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Trash2, Download, RotateCcw } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const [details, setDetails] = useState({
    clientName: "",
    projectName: "",
    date: "",
    invoiceNumber: "",
    bankDetails: "",
  });

  const [items, setItems] = useState([
    { id: 1, description: "", rate: 0, qty: 1 },
  ]);

  // LOAD SAVED DATA ON MOUNT
  useEffect(() => {
    setMounted(true);
    const savedDetails = localStorage.getItem("invoiceDetails");
    const savedItems = localStorage.getItem("invoiceItems");

    if (savedDetails) {
      setDetails(prev => ({ ...prev, ...JSON.parse(savedDetails) }));
    } else {
      setDetails(prev => ({
        ...prev,
        date: new Date().toISOString().split("T")[0],
        invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`
      }));
    }

    if (savedItems) setItems(JSON.parse(savedItems));
  }, []);

  // AUTO-SAVE ON EVERY CHANGE
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("invoiceDetails", JSON.stringify(details));
      localStorage.setItem("invoiceItems", JSON.stringify(items));
    }
  }, [details, items, mounted]);

  const addItem = () => setItems([...items, { id: Date.now(), description: "", rate: 0, qty: 1 }]);
  const removeItem = (id: number) => setItems(items.filter(item => item.id !== id));
  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  const calculateTotal = () => items.reduce((sum, item) => sum + (item.rate * item.qty), 0);

  const handleDownload = () => window.print();

  const resetInvoice = () => {
    if (confirm("Clear all invoice data?")) {
      setDetails({
        clientName: "",
        projectName: "",
        date: new Date().toISOString().split("T")[0],
        invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
        bankDetails: "",
      });
      setItems([{ id: Date.now(), description: "", rate: 0, qty: 1 }]);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans print:p-0 print:bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:w-full print:max-w-none print:m-0">

        {/* LEFT PANEL: INPUT CONTROLS */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <FileText className="text-indigo-500 w-6 h-6" />
              <h1 className="text-2xl font-bold tracking-tight">Invoice Builder</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetInvoice}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                title="Reset Invoice"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownload}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>

          <div className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={details.invoiceNumber}
                  onChange={(e) => setDetails({ ...details, invoiceNumber: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={details.clientName}
                  onChange={(e) => setDetails({ ...details, clientName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. Q4 Marketing Campaign"
                  value={details.projectName}
                  onChange={(e) => setDetails({ ...details, projectName: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">Date</label>
                <input
                  type="date"
                  value={details.date}
                  onChange={(e) => setDetails({ ...details, date: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">Bank & Payment Details</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Bank Name, A/C No, IFSC, UPI ID..."
                  value={details.bankDetails}
                  onChange={(e) => setDetails({ ...details, bankDetails: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* LINE ITEMS CONTROLS */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Line Items</h2>
              <button onClick={addItem} className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded flex items-center gap-1 transition-colors">
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-2 items-start bg-zinc-950 p-3 rounded border border-zinc-800">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Item description..."
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-indigo-500"
                    />
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-zinc-500 mb-1">Rate (₹)</label>
                        <input
                          type="number"
                          value={item.rate || ""}
                          onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="w-20">
                        <label className="block text-xs text-zinc-500 mb-1">Qty</label>
                        <input
                          type="number"
                          value={item.qty || ""}
                          onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-zinc-500 hover:text-red-500 transition-colors p-1 mt-6">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: LIVE PREVIEW & PRINT OUTPUT */}
        <div className="lg:col-span-7 print:col-span-12 print:w-full">
          <div className="bg-white text-zinc-900 p-10 rounded-sm shadow-2xl min-h-[700px] print:shadow-none print:p-0 print:min-h-0">
            <div className="flex justify-between items-start border-b-2 border-zinc-100 pb-8 mb-8">
              <div>
                <h2 className="text-4xl font-black text-zinc-950 tracking-tighter">INVOICE</h2>
                <p className="text-sm text-zinc-500 mt-1">{details.invoiceNumber}</p>
              </div>
              <div className="text-right text-sm space-y-1">
                <p className="font-bold text-zinc-900">Abi Kurian Varghese</p>
                <p className="text-zinc-500">Video Production & Grading</p>
                <p className="text-zinc-500">Kochi, Kerala</p>
              </div>
            </div>

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

            <div className="w-full text-sm">
              <div className="grid grid-cols-12 gap-4 font-bold text-zinc-400 border-b border-zinc-200 pb-2 mb-4">
                <div className="col-span-7">Description</div>
                <div className="col-span-2 text-right">Rate</div>
                <div className="col-span-1 text-center">Qty</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 py-3 border-b border-zinc-100 print:break-inside-avoid">
                  <div className="col-span-7 font-medium text-zinc-900">{item.description || "—"}</div>
                  <div className="col-span-2 text-right text-zinc-600">₹{item.rate.toLocaleString()}</div>
                  <div className="col-span-1 text-center text-zinc-600">{item.qty}</div>
                  <div className="col-span-2 text-right font-bold text-zinc-900">₹{(item.rate * item.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mt-8">
              <div className="w-full sm:w-1/2 text-xs text-zinc-600">
                {details.bankDetails && (
                  <div>
                    <p className="font-semibold text-zinc-900 mb-1 uppercase tracking-wider text-[11px]">Bank & Payment Details</p>
                    <p className="whitespace-pre-line leading-relaxed">{details.bankDetails}</p>
                  </div>
                )}
              </div>
              <div className="w-full sm:w-1/2 bg-zinc-50 p-4 rounded-lg print:bg-transparent print:border print:border-zinc-200">
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