import { useState, useEffect } from 'react'
import moment, { Moment } from 'moment'

interface CountdownResult {
  timeRemaining: moment.Duration | null
  formattedTimeRemaining: string | null
  daysRemaining: number
  hoursRemaining: number
  minutesRemaining: number
  secondsRemaining: number
}

const useCountDown = (endTime: Moment): CountdownResult => {
  const [timeRemaining, setTimeRemaining] = useState<moment.Duration | null>(
    null
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment()
      const timeDiff = moment.duration(endTime.diff(now))

      if (timeDiff.asSeconds() <= 0) {
        clearInterval(interval)
        setTimeRemaining(moment.duration(0))
      } else {
        setTimeRemaining(timeDiff)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  const formattedTimeRemaining = timeRemaining
    ? `${Math.floor(timeRemaining.asDays()).toString()}:${Math.floor(
        timeRemaining.asHours()
      )
        .toString()
        .padStart(2, '0')}:${timeRemaining
        .minutes()
        .toString()
        .padStart(2, '0')}:${timeRemaining
        .seconds()
        .toString()
        .padStart(2, '0')}`
    : null

  return {
    timeRemaining,
    formattedTimeRemaining,
    daysRemaining: timeRemaining ? Math.floor(timeRemaining.asDays()) : 0,
    hoursRemaining: timeRemaining ? Math.floor(timeRemaining.hours()) : 0,
    minutesRemaining: timeRemaining ? Math.floor(timeRemaining.minutes()) : 0,
    secondsRemaining: timeRemaining ? Math.floor(timeRemaining.seconds()) : 0,
  }
}

export default useCountDown
