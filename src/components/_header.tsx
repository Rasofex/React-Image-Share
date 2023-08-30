import { ModeToggle } from '@/components/mode-toggle.tsx'
import { Link } from 'react-router-dom'
export default function _header() {
  return (
    <header className="dark:bg-zinc-950 py-4 px-6 border-b-[1px]">
      <div className="flex container items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 decoration-0">
          <Link to="/">React Page Example</Link>
        </h1>
        <ModeToggle />
      </div>
    </header>
  )
}
