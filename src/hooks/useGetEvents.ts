import { useMemo } from 'react'

import { IVideo, ITeams } from '@/interfaces'

export const useGetEvents = (events: IVideo[] | undefined, teams: ITeams[]) => {
  const getEvents = useMemo(() => {
    return events
      ?.filter((events) => !events?.description.includes('Acompanhe'))
      .filter(
        (matches) =>
          matches?.description.includes('Circuito Brasileiro') ||
          matches?.description.includes('Campeonato Brasileiro') ||
          matches?.description.includes('Superliga 1XBET'),
      )
      .map((video) => {
        if (video?.description.includes('Circuito Brasileiro')) {
          const newVideo = {
            type: 'beach',
            id: video?.id,
            start_time: video?.start_time,
            preview_url: video?.preview_url,
            description: video?.description,
            slug: video?.slug,
            title: video?.description.split('-')[0].trim(),
            step: video?.description.split('-')[1].trim(),
            day: video?.description.split('-')[2].trim(),
            court: video?.description.split('-')[3].trim(),
          }

          return newVideo
        } else if (video?.description.includes('Campeonato Brasileiro')) {
          const newVideo = {
            type: 'court',
            id: video?.id,
            start_time: video?.start_time,
            preview_url: video?.preview_url,
            description: video?.description,
            slug: video?.slug,
            title: video?.description.split('-')[0].trim(),
            day: video?.description.split('-')[1].trim(),
            court: video?.description.split('-')[2].trim(),
          }

          return newVideo
        } else {
          const title = video?.description?.split(':')[0]?.trim()
          const homeTeam = video?.description
            .split(':')[1]
            ?.split(' - ')[0]
            ?.split(' x ')[0]
            ?.trim()
          const awayTeam = video?.description
            .split(':')[1]
            ?.split(' - ')[0]
            ?.split(' x ')[1]
            ?.trim()
          const findHomeTeamLogo = teams.find(
            (team) => team.nameFromAPI === homeTeam,
          )
          const findAwayTeamLogo = teams.find(
            (team) => team.nameFromAPI === awayTeam,
          )
          const newVideo = {
            type: 'court',
            id: video?.id,
            start_time: video?.start_time,
            preview_url: video?.preview_url,
            description: video?.description,
            slug: video?.slug,
            title,
            homeTeam: findHomeTeamLogo?.name,
            homeTeamLogo: findHomeTeamLogo?.logo,
            homeTeamShort: findHomeTeamLogo?.shortName,
            awayTeam: findAwayTeamLogo?.name,
            awayTeamLogo: findAwayTeamLogo?.logo,
            awayTeamShort: findAwayTeamLogo?.shortName,
          }

          return newVideo
        }
      })
  }, [events, teams])

  return {
    getBeachEvents: getEvents?.filter((event) =>
      event.description.includes('Circuito Brasileiro'),
    ),
    getCourtEvents: getEvents?.filter(
      (event) => !event.description.includes('Circuito Brasileiro'),
    ),
    firstTwoEvents: getEvents?.filter((_, idx) => idx < 2),
  }
}
