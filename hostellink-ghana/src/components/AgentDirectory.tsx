import { agents } from '../data/agents'
import AgentCard from './AgentCard'

export default function AgentDirectory() {
  const admin = agents.filter((a) => a.isAdmin)
  const others = agents.filter((a) => !a.isAdmin)
  return (
    <div className="space-y-8">
      {admin.map((a) => (
        <AgentCard key={a.id} agent={a} />
      ))}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((a) => (
          <li key={a.id}>
            <AgentCard agent={a} />
          </li>
        ))}
      </ul>
    </div>
  )
}
