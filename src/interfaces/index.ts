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
    homeTeam: string | undefined
    awayTeam: string | undefined
    homeTeamLogo: string | undefined
    awayTeamLogo: string | undefined
    homeTeamShort: string | undefined
    awayTeamShort: string | undefined
    court: string | undefined
    step: string | undefined
    day: string | undefined
  }
}

export interface ITeams {
  id: number
  name: string
  shortName: string
  logo: string
  nameFromAPI: string
}

export interface IInputRegister {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  birthDate: Date
  gender: 'masculino' | 'feminino'
  agreeTerms: boolean
}
