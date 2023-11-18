import { HotelsTable, ScriptsTable } from '@/app/ui/admin/table'

export default function AdminPage() {
  return (
    <main className="flex">
        <div className='flex-col'>
            <h2>Hotels</h2>
            <HotelsTable/>
            <h2>Scripts</h2>
            <ScriptsTable/>
        </div>
    </main>
  );
}