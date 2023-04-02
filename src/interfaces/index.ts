export interface IVideo {
  id: number
  description: string
  preview_url: string
  start_time: string
}

export interface IChannel {
  by_categories: {
    'Jogos Anteriores': IVideo[]
    'Melhores Momentos': IVideo[]
  }
  lives: IVideo[]
  upcomming: IVideo[]
}

export interface ITvChannel {
  videos: IChannel
}

export interface IEvent {
  id: number
  type: string
  description: string
  preview_url: string
  start_time: string
  title: string
  homeTeam?: string
  awayTeam?: string
  homeTeamLogo?: string
  awayTeamLogo?: string
  homeTeamShort?: string
  awayTeamShort?: string
  court?: string
  step?: string
  day?: string
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
  name: string
  birth_date: Date
  gender: 'male' | 'female'
  agreeTerms: boolean
}

export interface ILoginData {
  name: string
  email: string
  password: string
  channels: string[]
  gender: string
  birth_date: Date
}
