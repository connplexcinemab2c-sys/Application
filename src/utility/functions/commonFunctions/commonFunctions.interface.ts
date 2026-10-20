export interface CommonFunctionsProps {
  onBack: () => void;
  formatDuration: (minutes: number) => string;
  formatLikes: (value: number) => string;
  extractVideoId: (url: string) => string | undefined;
  displayDuration: (durationInHours: number) => string;
  handleStoragePermissionAndDownload: (item: any, setLoading: (loading: boolean) => void) => void
}
