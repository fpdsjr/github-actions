import { useMemo } from 'react'

import { IEvents, ITeams } from '@/interfaces'

export const useGetEvents = (
  upcoming: IEvents[] | undefined,
  teams: ITeams[],
) => {
  const getEvents = useMemo(() => {
    return upcoming
      ?.filter(
        (matches) =>
          matches.description.includes('Circuito Brasileiro') ||
          matches.description.includes('Campeonato Brasileiro') ||
          matches.description.includes('Superliga'),
      )
      .map((video) => {
        if (video.description.includes('Circuito Brasileiro')) {
          const processedData = {
            title: video.description.split('-')[0].trim(),
            step: video.description.split('-')[1].trim(),
            day: video.description.split('-')[2].trim(),
            court: video.description.split('-')[3].trim(),
            homeTeam: undefined,
            homeTeamLogo: undefined,
            homeTeamShort: undefined,
            awayTeam: undefined,
            awayTeamLogo: undefined,
            awayTeamShort: undefined,
          }

          const newVideo = {
            ...video,
            processedData,
          }

          return newVideo
        } else if (video.description.includes('Campeonato Brasileiro')) {
          const processedData = {
            title: video.description.split('-')[0].trim(),
            day: video.description.split('-')[1].trim(),
            court: video.description.split('-')[2].trim(),
            step: undefined,
            homeTeam: undefined,
            homeTeamLogo: undefined,
            homeTeamShort: undefined,
            awayTeam: undefined,
            awayTeamLogo: undefined,
            awayTeamShort: undefined,
          }

          const newVideo = {
            ...video,
            processedData,
          }

          return newVideo
        } else {
          const title = video.description.split(':')[0].trim()
          const homeTeam = video.description
            .split(':')[1]
            ?.split('-')[0]
            ?.split(' x ')[0]
            .trim()
          const awayTeam = video.description
            .split(':')[1]
            ?.split('-')[0]
            ?.split(' x ')[1]
            .trim()
          const findHomeTeamLogo = teams.find(
            (team) => team.nameFromAPI === homeTeam,
          )
          const findAwayTeamLogo = teams.find(
            (team) => team.nameFromAPI === awayTeam,
          )
          const newVideo = {
            ...video,
            processedData: {
              title,
              homeTeam: findHomeTeamLogo?.name,
              homeTeamLogo: findHomeTeamLogo?.logo,
              homeTeamShort: findHomeTeamLogo?.shortName,
              awayTeam: findAwayTeamLogo?.name,
              awayTeamLogo: findAwayTeamLogo?.logo,
              awayTeamShort: findAwayTeamLogo?.shortName,
              step: undefined,
              day: undefined,
              court: undefined,
            },
          }
          return newVideo
        }
      })
  }, [upcoming, teams])

  return {
    getBeachEvents: getEvents?.filter((event) =>
      event.description.includes('Circuito Brasileiro'),
    ),
    getCourtEvents: getEvents?.filter(
      (event) => !event.description.includes('Circuito Brasileiro'),
    ),
    typeFirstElement:
      getEvents?.[0].processedData.title.includes('Circuito Brasileiro') ||
      getEvents?.[0].processedData.title.includes('Campeonato Brasileiro')
        ? 'withoutTeams'
        : 'withTeams',
    firstElement: getEvents?.[0],
  }
}
