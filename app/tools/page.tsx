"use client";

import { useState, useEffect } from "react";
import { Wrench, Globe, Clock, Timer, Play, Pause, RotateCcw, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { format } from "date-fns";

export default function Tools() {
  // Time Zone Converter States
  const [targetTimeZone, setTargetTimeZone] = useState("UTC");
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [convertedTime, setConvertedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTimeZoneOpen, setIsTimeZoneOpen] = useState(false);

  // Work Hours Tracker States
  const [startWork, setStartWork] = useState("");
  const [endWork, setEndWork] = useState("");
  const [breakDuration, setBreakDuration] = useState("0");
  const [hourlyRate, setHourlyRate] = useState("0");
  const [workCalculation, setWorkCalculation] = useState({ hours: 0, earnings: 0 });

  // Countdown Timer States
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // Stopwatch States
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Fetch Time Zones on component mount
  useEffect(() => {
    const fetchTimeZones = async () => {
      try {
        const response = await fetch('https://timeapi.io/api/timezone/availabletimezones');
        const data = await response.json();
        setTimeZones(data);
      } catch (error) {
        console.error('Error fetching time zones:', error);
      }
    };
    fetchTimeZones();
  }, []);

  // Time Zone Converter
  const convertTime = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://timeapi.io/api/timezone/zone?timeZone=${targetTimeZone}`);
      const data = await response.json();
      setConvertedTime(data.currentLocalTime);
    } catch (error) {
      console.error('Error converting time:', error);
      setConvertedTime("Error converting time");
    }
    setLoading(false);
  };

  // Work Hours Calculator
  const calculateWork = () => {
    try {
      const start = new Date(`2025-01-01 ${startWork}`);
      const end = new Date(`2025-01-01 ${endWork}`);
      const breakMinutes = parseInt(breakDuration);
      const rate = parseFloat(hourlyRate);

      let diffMs = end - start;
      diffMs -= breakMinutes * 60 * 1000; // Subtract break duration
      const hours = diffMs / (1000 * 60 * 60);
      const earnings = hours * rate;

      setWorkCalculation({
        hours: Math.round(hours * 100) / 100,
        earnings: Math.round(earnings * 100) / 100
      });
    } catch (error) {
      console.error('Error calculating work hours:', error);
    }
  };

  // Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountdownRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCountdownRunning, remainingTime]);

  const startCountdown = () => {
    const totalSeconds = 
      parseInt(hours) * 3600 + 
      parseInt(minutes) * 60 + 
      parseInt(seconds);
    setRemainingTime(totalSeconds);
    setIsCountdownRunning(true);
  };

  const stopCountdown = () => {
    setIsCountdownRunning(false);
  };

  const resetCountdown = () => {
    setIsCountdownRunning(false);
    setRemainingTime(0);
    setHours("0");
    setMinutes("0");
    setSeconds("0");
  };

  // Stopwatch
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Wrench className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Advanced Tools</h1>
      </div>

      <Tabs defaultValue="timezone" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full overflow-x-auto">
          <TabsTrigger value="timezone" className="space-x-2">
            <Globe className="h-4 w-4" /> <span className="hidden xs:inline">Time Zone</span>
          </TabsTrigger>
          <TabsTrigger value="work" className="space-x-2">
            <Clock className="h-4 w-4" /> <span className="hidden xs:inline">Work Hours</span>
          </TabsTrigger>
          <TabsTrigger value="countdown" className="space-x-2">
            <Timer className="h-4 w-4" /> <span className="hidden xs:inline">Countdown</span>
          </TabsTrigger>
          <TabsTrigger value="stopwatch" className="space-x-2">
            <Clock className="h-4 w-4" /> <span className="hidden xs:inline">Stopwatch</span>
          </TabsTrigger>
        </TabsList>

        {/* Time Zone Converter */}
        <TabsContent value="timezone" className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Target Time Zone</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setIsTimeZoneOpen(true)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {targetTimeZone}
                </Button>
              </div>
            </div>
          </div>
          <CommandDialog open={isTimeZoneOpen} onOpenChange={setIsTimeZoneOpen}>
            <CommandInput placeholder="Search time zones..." />
            <CommandList>
              <CommandEmpty>No time zone found.</CommandEmpty>
              <CommandGroup>
                {timeZones.map((zone) => (
                  <CommandItem
                    key={zone}
                    onSelect={() => {
                      setTargetTimeZone(zone);
                      setIsTimeZoneOpen(false);
                    }}
                  >
                    {zone}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
          <Button onClick={convertTime} disabled={loading}>
            {loading ? "Converting..." : "Get Current Time"}
          </Button>
          {convertedTime && (
            <div className="mt-4 p-4 rounded-lg bg-muted">
              <p className="text-lg font-semibold">
                Current Time: {new Date(convertedTime).toLocaleString()}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Work Hours Tracker */}
        <TabsContent value="work" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={startWork}
                onChange={(e) => setStartWork(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={endWork}
                onChange={(e) => setEndWork(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Break Duration (minutes)</Label>
              <Input
                type="number"
                min="0"
                value={breakDuration}
                onChange={(e) => setBreakDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Hourly Rate ($)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={calculateWork}>Calculate</Button>
          {workCalculation.hours > 0 && (
            <div className="mt-4 p-4 rounded-lg bg-muted space-y-2">
              <p className="text-lg font-semibold">
                Total Hours: {workCalculation.hours}
              </p>
              <p className="text-lg font-semibold">
                Total Earnings: ${workCalculation.earnings}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Countdown Timer */}
        <TabsContent value="countdown" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Hours</Label>
              <Input
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                disabled={isCountdownRunning}
              />
            </div>
            <div className="space-y-2">
              <Label>Minutes</Label>
              <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                disabled={isCountdownRunning}
              />
            </div>
            <div className="space-y-2">
              <Label>Seconds</Label>
              <Input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                disabled={isCountdownRunning}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {!isCountdownRunning ? (
              <Button onClick={startCountdown}>
                <Play className="h-4 w-4 mr-2" /> Start
              </Button>
            ) : (
              <Button onClick={stopCountdown} variant="secondary">
                <Pause className="h-4 w-4 mr-2" /> Pause
              </Button>
            )}
            <Button onClick={resetCountdown} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" /> Reset
            </Button>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted">
            <p className="text-4xl font-mono text-center">
              {formatTime(remainingTime)}
            </p>
          </div>
        </TabsContent>

        {/* Stopwatch */}
        <TabsContent value="stopwatch" className="space-y-4">
          <div className="mt-4 p-4 rounded-lg bg-muted">
            <p className="text-4xl font-mono text-center">
              {formatTime(elapsedTime)}
            </p>
          </div>
          <div className="flex justify-center flex-wrap gap-2">
            <Button
              onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
              variant={isStopwatchRunning ? "secondary" : "default"}
            >
              {isStopwatchRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-2" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" /> Start
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                setIsStopwatchRunning(false);
                setElapsedTime(0);
              }}
              variant="outline"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Reset
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
