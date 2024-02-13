import React from "react";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="prose-invert prose-a:underline prose-a:text-sky-500 lg:prose-base w-1/2 bg-neutral-800 px-24 py-16 prose-headings:font-bold prose-ul:list-disc prose-ol:list-decimal shadow-[0px_20px_207px_10px_rgba(32,_91,_251,_0.2)] border-x-[6px] border-blue-950">
        {children}
      </div>
    </div>
  )
}