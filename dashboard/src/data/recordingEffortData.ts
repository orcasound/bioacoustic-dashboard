import { colorForValue } from "../utils/helpers";
import { binaryHeatmap } from "../utils/plotly";

export const recordingEffortData = [
  {
    "date": "2021-01-01",
    "recordingConsistency": 0.6173611111111111
  },
  {
    "date": "2021-01-02",
    "recordingConsistency": 0.16527777777777777
  },
  {
    "date": "2021-01-03",
    "recordingConsistency": 0
  },
  {
    "date": "2021-01-04",
    "recordingConsistency": 0.3013888888888889
  },
  {
    "date": "2021-01-05",
    "recordingConsistency": 0.13194444444444445
  },
  {
    "date": "2021-01-06",
    "recordingConsistency": 0.15069444444444444
  },
  {
    "date": "2021-01-07",
    "recordingConsistency": 0.18958333333333333
  },
  {
    "date": "2021-01-08",
    "recordingConsistency": 0.10416666666666669
  },
  {
    "date": "2021-01-09",
    "recordingConsistency": 0.23402777777777778
  },
  {
    "date": "2021-01-10",
    "recordingConsistency": 0.06319444444444444
  },
  {
    "date": "2021-01-11",
    "recordingConsistency": 0.19722222222222222
  },
  {
    "date": "2021-01-12",
    "recordingConsistency": 0.10902777777777778
  },
  {
    "date": "2021-01-13",
    "recordingConsistency": 0.00625
  },
  {
    "date": "2021-01-14",
    "recordingConsistency": 0.11388888888888889
  },
  {
    "date": "2021-01-15",
    "recordingConsistency": 0.29583333333333334
  },
  {
    "date": "2021-01-16",
    "recordingConsistency": 0.9090277777777778
  },
  {
    "date": "2021-01-17",
    "recordingConsistency": 0.9520833333333333
  },
  {
    "date": "2021-01-18",
    "recordingConsistency": 0.8861111111111112
  },
  {
    "date": "2021-01-19",
    "recordingConsistency": 0.9180555555555556
  },
  {
    "date": "2021-01-20",
    "recordingConsistency": 0.9729166666666668
  },
  {
    "date": "2021-01-21",
    "recordingConsistency": 0.7006944444444444
  },
  {
    "date": "2021-01-22",
    "recordingConsistency": 0.8888888888888888
  },
  {
    "date": "2021-01-23",
    "recordingConsistency": 0.1125
  },
  {
    "date": "2021-01-24",
    "recordingConsistency": 0.8673611111111111
  },
  {
    "date": "2021-01-25",
    "recordingConsistency": 0.1284722222222222
  },
  {
    "date": "2021-01-26",
    "recordingConsistency": 0.6125
  },
  {
    "date": "2021-01-27",
    "recordingConsistency": 0.08958333333333333
  },
  {
    "date": "2021-01-28",
    "recordingConsistency": 0.23194444444444445
  },
  {
    "date": "2021-01-29",
    "recordingConsistency": 0.26875
  },
  {
    "date": "2021-01-30",
    "recordingConsistency": 0.14583333333333334
  },
  {
    "date": "2021-01-31",
    "recordingConsistency": 0.81875
  },
  {
    "date": "2021-02-01",
    "recordingConsistency": 0.24305555555555552
  },
  {
    "date": "2021-02-02",
    "recordingConsistency": 0
  },
  {
    "date": "2021-02-03",
    "recordingConsistency": 0
  },
  {
    "date": "2021-02-04",
    "recordingConsistency": 0
  },
  {
    "date": "2021-02-05",
    "recordingConsistency": 0
  },
  {
    "date": "2021-02-06",
    "recordingConsistency": 0
  },
  {
    "date": "2021-02-07",
    "recordingConsistency": 0
  },
  {
    "date": "2021-02-08",
    "recordingConsistency": 0
  },
  {
    "date": "2021-02-09",
    "recordingConsistency": 0.28402777777777777
  },
  {
    "date": "2021-02-10",
    "recordingConsistency": 0.3701388888888889
  },
  {
    "date": "2021-02-11",
    "recordingConsistency": 0.46597222222222223
  },
  {
    "date": "2021-02-12",
    "recordingConsistency": 0.13472222222222222
  },
  {
    "date": "2021-02-13",
    "recordingConsistency": 0
  },
  {
    "date": "2021-02-14",
    "recordingConsistency": 0
  },
  {
    "date": "2021-02-15",
    "recordingConsistency": 0.003472222222222222
  },
  {
    "date": "2021-02-16",
    "recordingConsistency": 0.9875
  },
  {
    "date": "2021-02-17",
    "recordingConsistency": 0.8923611111111112
  },
  {
    "date": "2021-02-18",
    "recordingConsistency": 0.5680555555555555
  },
  {
    "date": "2021-02-19",
    "recordingConsistency": 0.8222222222222222
  },
  {
    "date": "2021-02-20",
    "recordingConsistency": 0.875
  },
  {
    "date": "2021-02-21",
    "recordingConsistency": 0.825
  },
  {
    "date": "2021-02-22",
    "recordingConsistency": 0.40208333333333335
  },
  {
    "date": "2021-02-23",
    "recordingConsistency": 0.85625
  },
  {
    "date": "2021-02-24",
    "recordingConsistency": 0.8833333333333333
  },
  {
    "date": "2021-02-25",
    "recordingConsistency": 0.9125
  },
  {
    "date": "2021-02-26",
    "recordingConsistency": 0.9659722222222222
  },
  {
    "date": "2021-02-27",
    "recordingConsistency": 0.4048611111111111
  },
  {
    "date": "2021-02-28",
    "recordingConsistency": 0.5736111111111111
  },
  {
    "date": "2021-03-01",
    "recordingConsistency": 0.7375
  },
  {
    "date": "2021-03-02",
    "recordingConsistency": 0.6791666666666667
  },
  {
    "date": "2021-03-03",
    "recordingConsistency": 0.36111111111111105
  },
  {
    "date": "2021-03-04",
    "recordingConsistency": 0.54375
  },
  {
    "date": "2021-03-05",
    "recordingConsistency": 0.19375
  },
  {
    "date": "2021-03-06",
    "recordingConsistency": 0.29444444444444445
  },
  {
    "date": "2021-03-07",
    "recordingConsistency": 0.19166666666666668
  },
  {
    "date": "2021-03-08",
    "recordingConsistency": 0.2020833333333333
  },
  {
    "date": "2021-03-09",
    "recordingConsistency": 0.36736111111111114
  },
  {
    "date": "2021-03-10",
    "recordingConsistency": 0.27361111111111114
  },
  {
    "date": "2021-03-11",
    "recordingConsistency": 0.76875
  },
  {
    "date": "2021-03-12",
    "recordingConsistency": 0.5902777777777778
  },
  {
    "date": "2021-03-13",
    "recordingConsistency": 0.7090277777777778
  },
  {
    "date": "2021-03-14",
    "recordingConsistency": 0.7972222222222223
  },
  {
    "date": "2021-03-15",
    "recordingConsistency": 0.71875
  },
  {
    "date": "2021-03-16",
    "recordingConsistency": 0.3840277777777778
  },
  {
    "date": "2021-03-17",
    "recordingConsistency": 0.029166666666666664
  },
  {
    "date": "2021-03-18",
    "recordingConsistency": 0
  },
  {
    "date": "2021-03-19",
    "recordingConsistency": 0
  },
  {
    "date": "2021-03-20",
    "recordingConsistency": 0.010416666666666664
  },
  {
    "date": "2021-03-21",
    "recordingConsistency": 0
  },
  {
    "date": "2021-03-22",
    "recordingConsistency": 0.27361111111111114
  },
  {
    "date": "2021-03-23",
    "recordingConsistency": 0.26319444444444445
  },
  {
    "date": "2021-03-24",
    "recordingConsistency": 0.1673611111111111
  },
  {
    "date": "2021-03-25",
    "recordingConsistency": 0.022222222222222223
  },
  {
    "date": "2021-03-26",
    "recordingConsistency": 0.4326388888888889
  },
  {
    "date": "2021-03-27",
    "recordingConsistency": 0.029861111111111113
  },
  {
    "date": "2021-03-28",
    "recordingConsistency": 0
  },
  {
    "date": "2021-03-29",
    "recordingConsistency": 0.035416666666666666
  },
  {
    "date": "2021-03-30",
    "recordingConsistency": 0.05833333333333333
  },
  {
    "date": "2021-03-31",
    "recordingConsistency": 0.02847222222222222
  },
  {
    "date": "2021-04-01",
    "recordingConsistency": 0.2673611111111111
  },
  {
    "date": "2021-04-02",
    "recordingConsistency": 0.26944444444444443
  },
  {
    "date": "2021-04-03",
    "recordingConsistency": 0
  },
  {
    "date": "2021-04-04",
    "recordingConsistency": 0
  },
  {
    "date": "2021-04-05",
    "recordingConsistency": 0.02430555555555556
  },
  {
    "date": "2021-04-06",
    "recordingConsistency": 0.8333333333333335
  },
  {
    "date": "2021-04-07",
    "recordingConsistency": 0.9652777777777779
  },
  {
    "date": "2021-04-08",
    "recordingConsistency": 0.9097222222222221
  },
  {
    "date": "2021-04-09",
    "recordingConsistency": 0.8645833333333335
  },
  {
    "date": "2021-04-10",
    "recordingConsistency": 0.84375
  },
  {
    "date": "2021-04-11",
    "recordingConsistency": 0.9097222222222221
  },
  {
    "date": "2021-04-12",
    "recordingConsistency": 0.9479166666666665
  },
  {
    "date": "2021-04-13",
    "recordingConsistency": 0.9791666666666665
  },
  {
    "date": "2021-04-14",
    "recordingConsistency": 0.9791666666666665
  },
  {
    "date": "2021-04-15",
    "recordingConsistency": 0.9756944444444444
  },
  {
    "date": "2021-04-16",
    "recordingConsistency": 0.9236111111111112
  },
  {
    "date": "2021-04-17",
    "recordingConsistency": 0.9652777777777779
  },
  {
    "date": "2021-04-18",
    "recordingConsistency": 0.9548611111111112
  },
  {
    "date": "2021-04-19",
    "recordingConsistency": 0.9444444444444444
  },
  {
    "date": "2021-04-20",
    "recordingConsistency": 0.8958333333333335
  },
  {
    "date": "2021-04-21",
    "recordingConsistency": 0.9375
  },
  {
    "date": "2021-04-22",
    "recordingConsistency": 0.8298611111111112
  },
  {
    "date": "2021-04-23",
    "recordingConsistency": 0.9548611111111112
  },
  {
    "date": "2021-04-24",
    "recordingConsistency": 0.9444444444444444
  },
  {
    "date": "2021-04-25",
    "recordingConsistency": 0.9479166666666665
  },
  {
    "date": "2021-04-26",
    "recordingConsistency": 0.875
  },
  {
    "date": "2021-04-27",
    "recordingConsistency": 0.9583333333333335
  },
  {
    "date": "2021-04-28",
    "recordingConsistency": 0.9444444444444444
  },
  {
    "date": "2021-04-29",
    "recordingConsistency": 0.9756944444444444
  },
  {
    "date": "2021-04-30",
    "recordingConsistency": 0.90625
  },
  {
    "date": "2021-05-01",
    "recordingConsistency": 0.8368055555555556
  },
  {
    "date": "2021-05-02",
    "recordingConsistency": 0.9097222222222221
  },
  {
    "date": "2021-05-03",
    "recordingConsistency": 0.9861111111111112
  },
  {
    "date": "2021-05-04",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-05-05",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-05-06",
    "recordingConsistency": 0.3368055555555556
  },
  {
    "date": "2021-05-07",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-08",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-05-09",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-05-10",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-11",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-05-12",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-05-13",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-14",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-15",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-16",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-05-17",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-18",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-19",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-20",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-05-21",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-22",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-23",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-05-24",
    "recordingConsistency": 1
  },
  {
    "date": "2021-05-25",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-05-26",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-27",
    "recordingConsistency": 0.7777777777777779
  },
  {
    "date": "2021-05-28",
    "recordingConsistency": 0.7847222222222221
  },
  {
    "date": "2021-05-29",
    "recordingConsistency": 0.19791666666666663
  },
  {
    "date": "2021-05-30",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-05-31",
    "recordingConsistency": 0.9791666666666665
  },
  {
    "date": "2021-06-01",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-06-02",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-06-03",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-06-04",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-06-05",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-06-06",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-07",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-06-08",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-09",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-10",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-11",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-06-12",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-13",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-14",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-06-15",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-16",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-17",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-18",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-06-19",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-06-20",
    "recordingConsistency": 0.9479166666666665
  },
  {
    "date": "2021-06-21",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-22",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-23",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-24",
    "recordingConsistency": 0.96875
  },
  {
    "date": "2021-06-25",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-26",
    "recordingConsistency": 0.9618055555555556
  },
  {
    "date": "2021-06-27",
    "recordingConsistency": 0.9583333333333335
  },
  {
    "date": "2021-06-28",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-29",
    "recordingConsistency": 1
  },
  {
    "date": "2021-06-30",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-07-01",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-02",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-03",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-07-04",
    "recordingConsistency": 0.9861111111111112
  },
  {
    "date": "2021-07-05",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-06",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-07",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-08",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-09",
    "recordingConsistency": 0.9409722222222221
  },
  {
    "date": "2021-07-10",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-07-11",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-12",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-13",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-14",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-07-15",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-16",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-17",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-18",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-07-19",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-20",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-07-21",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-22",
    "recordingConsistency": 1
  },
  {
    "date": "2021-07-23",
    "recordingConsistency": 0.6944444444444444
  },
  {
    "date": "2021-07-24",
    "recordingConsistency": 0
  },
  {
    "date": "2021-07-25",
    "recordingConsistency": 0
  },
  {
    "date": "2021-07-26",
    "recordingConsistency": 0
  },
  {
    "date": "2021-07-27",
    "recordingConsistency": 0
  },
  {
    "date": "2021-07-28",
    "recordingConsistency": 0
  },
  {
    "date": "2021-07-29",
    "recordingConsistency": 0
  },
  {
    "date": "2021-07-30",
    "recordingConsistency": 0
  },
  {
    "date": "2021-07-31",
    "recordingConsistency": 0.003472222222222222
  },
  {
    "date": "2021-08-01",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-02",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-08-03",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-04",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-08-05",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-06",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-07",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-08",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-09",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-10",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-11",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-12",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-13",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-08-14",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-15",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-16",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-17",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-18",
    "recordingConsistency": 0.5868055555555556
  },
  {
    "date": "2021-08-19",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-20",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-21",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-22",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-23",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-08-24",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-25",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-26",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-27",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-28",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-29",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-08-30",
    "recordingConsistency": 1
  },
  {
    "date": "2021-08-31",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-09-01",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-02",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-03",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-04",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-05",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-06",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-07",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-08",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-09",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-10",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-11",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-12",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-13",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-14",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-15",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-09-16",
    "recordingConsistency": 0.96875
  },
  {
    "date": "2021-09-17",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-18",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-19",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-20",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-21",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-22",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-23",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-09-24",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-25",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-26",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-27",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-28",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-29",
    "recordingConsistency": 1
  },
  {
    "date": "2021-09-30",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-10-01",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-10-02",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-03",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-10-04",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-05",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-10-06",
    "recordingConsistency": 0.8368055555555556
  },
  {
    "date": "2021-10-07",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-10-08",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-10-09",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-10",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-10-11",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-10-12",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-10-13",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-10-14",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-15",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-10-16",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-10-17",
    "recordingConsistency": 0.5034722222222222
  },
  {
    "date": "2021-10-18",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-10-19",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-20",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-21",
    "recordingConsistency": 0.9375
  },
  {
    "date": "2021-10-22",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-23",
    "recordingConsistency": 0.8819444444444444
  },
  {
    "date": "2021-10-24",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-25",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-26",
    "recordingConsistency": 0.625
  },
  {
    "date": "2021-10-27",
    "recordingConsistency": 0.96875
  },
  {
    "date": "2021-10-28",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-29",
    "recordingConsistency": 0.4305555555555556
  },
  {
    "date": "2021-10-30",
    "recordingConsistency": 1
  },
  {
    "date": "2021-10-31",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-11-01",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-11-02",
    "recordingConsistency": 1
  },
  {
    "date": "2021-11-03",
    "recordingConsistency": 0.9861111111111112
  },
  {
    "date": "2021-11-04",
    "recordingConsistency": 0.9652777777777779
  },
  {
    "date": "2021-11-05",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-11-06",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-07",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-11-08",
    "recordingConsistency": 0.9861111111111112
  },
  {
    "date": "2021-11-09",
    "recordingConsistency": 0.9826388888888888
  },
  {
    "date": "2021-11-10",
    "recordingConsistency": 0.9861111111111112
  },
  {
    "date": "2021-11-11",
    "recordingConsistency": 0.9861111111111112
  },
  {
    "date": "2021-11-12",
    "recordingConsistency": 0.9826388888888888
  },
  {
    "date": "2021-11-13",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-14",
    "recordingConsistency": 0.3194444444444444
  },
  {
    "date": "2021-11-15",
    "recordingConsistency": 1
  },
  {
    "date": "2021-11-16",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-17",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-18",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-19",
    "recordingConsistency": 0.9861111111111112
  },
  {
    "date": "2021-11-20",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-21",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-22",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-11-23",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-24",
    "recordingConsistency": 0.6215277777777778
  },
  {
    "date": "2021-11-25",
    "recordingConsistency": 0.006944444444444444
  },
  {
    "date": "2021-11-26",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-27",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-28",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-29",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-11-30",
    "recordingConsistency": 0.9166666666666665
  },
  {
    "date": "2021-12-01",
    "recordingConsistency": 0
  },
  {
    "date": "2021-12-02",
    "recordingConsistency": 0
  },
  {
    "date": "2021-12-03",
    "recordingConsistency": 0
  },
  {
    "date": "2021-12-04",
    "recordingConsistency": 0.9548611111111112
  },
  {
    "date": "2021-12-05",
    "recordingConsistency": 0.9895833333333335
  },
  {
    "date": "2021-12-06",
    "recordingConsistency": 0.9826388888888888
  },
  {
    "date": "2021-12-07",
    "recordingConsistency": 1
  },
  {
    "date": "2021-12-08",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-12-09",
    "recordingConsistency": 0.05555555555555555
  },
  {
    "date": "2021-12-10",
    "recordingConsistency": 0
  },
  {
    "date": "2021-12-11",
    "recordingConsistency": 0.2048611111111111
  },
  {
    "date": "2021-12-12",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-12-13",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-12-14",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-12-15",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-12-16",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-12-17",
    "recordingConsistency": 1
  },
  {
    "date": "2021-12-18",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-12-19",
    "recordingConsistency": 0.8194444444444444
  },
  {
    "date": "2021-12-20",
    "recordingConsistency": 0
  },
  {
    "date": "2021-12-21",
    "recordingConsistency": 0.12152777777777776
  },
  {
    "date": "2021-12-22",
    "recordingConsistency": 1
  },
  {
    "date": "2021-12-23",
    "recordingConsistency": 0.9930555555555556
  },
  {
    "date": "2021-12-24",
    "recordingConsistency": 1
  },
  {
    "date": "2021-12-25",
    "recordingConsistency": 0.9861111111111112
  },
  {
    "date": "2021-12-26",
    "recordingConsistency": 1
  },
  {
    "date": "2021-12-27",
    "recordingConsistency": 0.9965277777777779
  },
  {
    "date": "2021-12-28",
    "recordingConsistency": 0.07291666666666667
  },
  {
    "date": "2021-12-29",
    "recordingConsistency": 0
  },
  {
    "date": "2021-12-30",
    "recordingConsistency": 0
  },
  {
    "date": "2021-12-31",
    "recordingConsistency": 0
  }
];

function withMeta() {
  return recordingEffortData.map((row) => {
    return {
      ...row,
      recordingConsistencyTextColor: colorForValue(row.recordingConsistency),
      recordingConsistencyPercent: row.recordingConsistency * 100,
    }
  })
}

export function recordingEffortFiltered(filter) {
  return filter ? withMeta().filter(filter) : withMeta();
}

export function recordingEffortBinaryChartConfig(visible = true, filter) {
  const filteredData = recordingEffortFiltered(filter);
  const recordingEffortGaps = filteredData.map((row) => row.recordingConsistency < .5 ? 1 : 0);
  return {
    ...binaryHeatmap(filteredData, recordingEffortGaps, '', 'rgba(0,0,0, 0.1)'),
    hoverinfo: 'skip',
    visible,
    background: true,
  };
}