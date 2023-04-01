import { IUpcoming } from '@/interfaces'
import { HeaderCourtCard } from './HeaderCourtCard'
import { BodyCourtCard } from './BodyCourtCard'

interface CourtCardProps {
  match: IUpcoming
}

export function CourtCard({ match }: CourtCardProps) {
  return (
    <div className="h-[273.28px] py-0 px-6 rounded-lg bg-gradient-to-b from-[rgb(87,122,163)0%] via-[rgba(209,226,237,0.8)50%] to-[rgba(223,229,233,0.929)100%] backdrop-blur-lg bg-white/20">
      <HeaderCourtCard match={match} />
      <BodyCourtCard match={match} />
    </div>
  )
}
