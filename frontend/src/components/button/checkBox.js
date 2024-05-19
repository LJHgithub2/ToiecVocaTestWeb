export default function CheckBox(props) {
    return (
      <>
        <div class="inline-flex items-center">
          <label
            class="relative flex cursor-pointer items-center rounded-full p-2"
            for={props.id}
            data-ripple-dark="true"
          >
            <input
              id={props.id}
              type="checkbox"
              class="before:content[''] relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-6 before:w-6 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacit hover:before:opacity-10 focus:ring-0"
              style={{ '--tw-ring-shadow': 'none' }}
            />
  
            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 stroke-1"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <label
            class="mt-px cursor-pointer text-xs select-none font-light text-gray-700"
            for={props.id}
          >
            관심 단어
          </label>
        </div>
      </>
    );
  }
  