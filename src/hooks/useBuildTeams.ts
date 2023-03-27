import { ITeams, ITvChannel } from '@/interfaces'
import { useMemo } from 'react'

export const useGetTeams = (
  channel: ITvChannel | undefined,
  teams: ITeams[],
) => {
  const getTeams = useMemo(() => {
    return channel?.videos?.upcomming
      ?.map((upcomming) => {
        const title = upcomming.description.split(':')[0].trim()
        const homeTeam = upcomming.description
          .split(':')[1]
          ?.split('x')[0]
          .trim()
        const awayTeam = upcomming.description
          .split(':')[1]
          ?.split('x')[1]
          .trim()

        const findHomeTeamLogo = teams.find(
          (team) => team.nameFromAPI === homeTeam,
        )
        const findAwayTeamLogo = teams.find(
          (team) => team.nameFromAPI === awayTeam,
        )

        const newVideo = {
          ...upcomming,
          processedData: {
            title,
            homeTeam: findHomeTeamLogo?.name,
            homeTeamLogo: findHomeTeamLogo?.logo,
            homeTeamShort: findHomeTeamLogo?.shortName,
            awayTeam: findAwayTeamLogo?.name,
            awayTeamLogo: findAwayTeamLogo?.logo,
            awayTeamShort: findAwayTeamLogo?.shortName,
          },
        }

        return newVideo
      })
      .filter(
        (match) =>
          match.processedData.homeTeam !== undefined &&
          match.processedData.awayTeam !== undefined,
      )
  }, [channel, teams])

  return getTeams
}
