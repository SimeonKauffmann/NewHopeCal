<template>
  <div class="year">
    <b-container>
      <b-row no-gutters>
        <b-col class="year-col year-col-title">
          <h1>2021</h1>
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-col class="year-col">
          <b-row no-gutters>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                January
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                February
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                March
              </b-button>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                April
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                May
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                June
              </b-button>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                July
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                August
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                September
              </b-button>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                October
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                November
              </b-button>
            </b-col>
            <b-col class="year-col year-col-buttons">
              <b-button size="lg" class="date-button" variant="light">
                December
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-col cols="9"></b-col>
        <b-col class="year-col year-col-svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
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
}
.btn:hover {
  transform: scale(1.1);
}
.btn-light:hover,
.btn:active {
  background: #849283;
  border: none;
}
.year-col-title {
  margin-left: 15px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.year-col-buttons {
  text-align: center;

  margin-bottom: 10px;
}
.year-col-svg {
  text-align: right;
  margin-top: 30px;
  margin-right: 15px;
}
.year-col {
  border: 2px solid transparent;
}
</style>
