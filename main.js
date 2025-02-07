/**
 * INIT CODE
 * 
 * Purpose: Load local files, import modules, declare lifecycle functions, and define global variables.
 * 
 * Called: Once per VU if local, In cloud scripts, init code might be called more often.
 * 
 * Example: Open JSON file, Import module
 * */
export * from './scenarios/index.js';

/**
 * SETUP CODE
 * 
 * Purpose: Set up data for processing, share data among VUs or initialize data structures.
 * 
 * Called: Once
 * 
 * Example: Call API to start test environment
 */
export function setup() {
  const name = "Setup Entry Point";

  return { name };
}

/**
 * MAIN CODE
 * 
 * Purpose: Run the test function, usually `default` export.
 * 
 * Called: Once per iteration, as many times as the test options require it.
 * 
 * Example: Make https requests, validate responses and data, simulate user behavior
 */
export default (data) => {
  console.log(`No scenarios in test.json. Executing ${data.name} default function...`);
}

/**
 * TEARDOWN CODE
 * 
 * Purpose: Process result of setup code, stop test environment, close connections, and release resources.
 * 
 * Called: Once
 * 
 * Example: Validate that setup had a certain result, send webhook notifying that test has finished.
 * 
 * Note: 
 *  If the `Setup` function ends abnormally (e.g throws an error), the teardown() function isn’t called.
 *  Consider adding logic to the `setup()` function to handle errors and ensure proper cleanup.
 */
export function teardown(data) {
  console.log(data);
}