import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '../services/firebase';

interface Lead {
    id: string;
    name?: string;
    email?: string;
    business?: string;
    type?: string;
    status?: string;
    createdAt?: any;
}

const AdminLeads: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            // Safe query: if index missing, it might error on orderBy, but basic fetch works.
            // Using limit(50) for safety.
            const leadsRef = collection(db, 'leads');
            const q = query(leadsRef, orderBy('createdAt', 'desc'), limit(50));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
            setLeads(data);
        } catch (error: any) {
            console.error("Error fetching leads:", error);
            // Fallback if orderBy fails (index requirement)
            if (error.code === 'failed-precondition') {
                const leadsRef = collection(db, 'leads');
                const snapshot = await getDocs(leadsRef);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
                setLeads(data);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-display">Data Center</h2>
                    <p className="text-sm text-gray-500">Live feed from OnlineEverywhere.com</p>
                </div>
                <button
                    onClick={fetchLeads}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                >
                    <span className={`material-symbols-outlined text-lg ${loading ? 'animate-spin' : ''}`}>refresh</span>
                    Refresh Sync
                </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-5 font-bold uppercase tracking-widest text-[10px] text-gray-400">Timestamp</th>
                                <th className="p-5 font-bold uppercase tracking-widest text-[10px] text-gray-400">Contact</th>
                                <th className="p-5 font-bold uppercase tracking-widest text-[10px] text-gray-400">Organization</th>
                                <th className="p-5 font-bold uppercase tracking-widest text-[10px] text-gray-400">Source</th>
                                <th className="p-5 font-bold uppercase tracking-widest text-[10px] text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="p-5 font-mono text-xs text-gray-400">
                                        {lead.createdAt?.seconds
                                            ? new Date(lead.createdAt.seconds * 1000).toLocaleString()
                                            : 'Pending...'}
                                    </td>
                                    <td className="p-5">
                                        <div className="font-bold text-gray-900">{lead.name || 'Anonymous'}</div>
                                        <div className="text-xs text-gray-400">{lead.email}</div>
                                    </td>
                                    <td className="p-5 font-medium text-gray-700">{lead.business || 'N/A'}</td>
                                    <td className="p-5">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${lead.type === 'audit' ? 'bg-red-50 text-red-600' :
                                                lead.type === 'early-access' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {lead.type}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            New
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <span className="material-symbols-outlined text-4xl text-gray-200">inbox</span>
                                            <p className="text-gray-400 font-medium">No data streams detected.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminLeads;
