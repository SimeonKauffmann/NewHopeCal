<template>
  <div class="year">
    <b-container>
      <b-row no-gutters>
        <b-col class="year-col year-col-title">
          <h1>{{ year }}</h1>
        </b-col>
        <b-col class="year-col year-col-svg">
          <div class="svg-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
              @click="decreaseYear"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </div>
          <div class="svg-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
              @click="increaseYear"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row no-gutters>
        <b-col class="year-col">
          <b-row no-gutters>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('01')"
              >
                January
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('02')"
              >
                February
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('03')"
              >
                March
              </b-button>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('04')"
              >
                April
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('05')"
              >
                May
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('06')"
              >
                June
              </b-button>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('07')"
              >
                July
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('08')"
              >
                August
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('09')"
              >
                September
              </b-button>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('10')"
              >
                October
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('11')"
              >
                November
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button
                size="lg"
                class="date-button"
                variant="light"
                @click="submitYear('12')"
              >
                December
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      year: moment().format('YYYY')
    };
  },
  methods: {
    decreaseYear() {
      return this.year--;
    },
    increaseYear() {
      return this.year++;
    },
    submitYear(month) {
      this.$store.commit('setYear', `${this.year}-${month}-01`);
      setTimeout(() => {
        this.$router.push('/month');
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
/*==========
    Layout
===========*/
.year-col-title {
  margin-left: 15px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.year-col-buttons {
  text-align: center;
  margin-bottom: 10px;
  animation: 2s ease-in 0s 1 growIn;
}
.year-col-svg {
  margin-top: 30px;
  .svg-left {
    display: inline-block;
    padding-right: 50px;
    padding-top: 10px;
  }
  .svg-right {
    display: inline-block;
  }
}
.year-col {
  border: 2px solid transparent;
}

/*==========
   Styling
===========*/
.container {
  padding-left: 5px;
  padding-right: 5px;
}
.btn-lg {
  padding: 0;
}
.date-button {
  height: 120px;
  width: 110px;
  border-radius: 25px;
  box-shadow: 7px 7px rgba(88, 87, 75, 0.5);
}
.btn {
  transform: scale(1);
  transform-origin: center;
  transition: transform 250ms ease-in;
  animation: 2s ease-out 0s 1 colorButton;
}
.btn:hover {
  transform: scale(1.1);
}
.btn-light:hover,
.btn:active {
  background: #849283;
  border: none;
}

@keyframes growIn {
  from {
    transform: scale(0.3);
    opacity: 0;
  }

  80% {
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    // background: rgba(229, 152, 118, 1);
    transform: scale(1);
  }
}
@keyframes colorButton {
  from {
    color: transparent;
    font-size: 15px;
  }
  70% {
    font-size: 25px;
  }
  to {
    color: black;
  }
}
</style>
