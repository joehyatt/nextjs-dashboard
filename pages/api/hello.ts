import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}


<button class="flex h-full w-full cursor-default flex-col items-center justify-center border-0 p-0 text-base lg:items-stretch text-text-disabled text-text" data-testid="arrival-2023-11-03" disabled="" type="button" aria-label="November 3.">
  <div class="group-hover:text-text-inverse hidden pl-2 pt-1 text-left text-sm lg:block">3</div>
  <div class="text-center lg:hidden pb-4">3</div>
  <div class="overflow-hidden lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-center"></div>
</button>

document.querySelector(`button[data-testid='arrival-2023-12-06'] > div:nth-child(3) > div > span[data-testid='rateNotAvailable']`)
<button class="flex h-full w-full cursor-default flex-col items-center justify-center border-0 p-0 text-base lg:items-stretch text-text-disabled text-text" data-testid="arrival-2023-12-06" type="button" aria-label="30 night stay unavailable for December 6 through January 5" disabled="">
  <div class="group-hover:text-text-inverse hidden pl-2 pt-1 text-left text-sm lg:block">6<span class="text-text-alt group-hover:text-text-inverse"> - 5</span></div>
  <div class="text-center lg:hidden">6</div>
  <div class="overflow-hidden lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-center">
    <div class="text-text-alt group-hover:text-text-inverse px-1 text-xs hidden lg:block">
      <span data-testid="rateNotAvailable">30 night stay unavailable</span>
    </div>
    <div class="text-text-disabled leading-none lg:hidden text-primary">--</div>
  </div>
</button>