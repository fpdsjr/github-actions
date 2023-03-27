export interface IEvents {
  id: number
  description: string
  is_live: boolean
  video_is_live: boolean
  preview_url: string
  slug: string
  start_time: string
}

export interface IVideo {
  by_categories: {}
  lives: IEvents[]
  upcomming: IEvents[]
}

export interface ITvChannel {
  videos: IVideo
}

export interface IUpcoming {
  id: number
  description: string
  is_live: boolean
  video_is_live: boolean
  preview_url: string
  slug: string
  start_time: string
  processedData: {
    title: string
    homeTeam: string
    awayTeam: string
    homeTeamLogo: string
    awayTeamLogo: string
    homeTeamShort: string
    awayTeamShort: string
  }
}
