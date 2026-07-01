import React from 'react';
import { BsDatabaseExclamation } from "react-icons/bs"; 

export default function EmptyState({ text = "Belum ada data" }) {
    return (
        <div className="p-8 text-center text-gray-500 bg-white rounded-2xl shadow-md border border-dashed border-gray-200">
            <div className="text-4xl mb-2 flex justify-center text-gray-400">
                <BsDatabaseExclamation />   
            </div>
            <p className="font-medium text-sm">{text}</p>
        </div>
    )
}