import { MutableRefObject } from "react";

export class DomHelper {
  /**
   * Displays dialog.
   * @param dialogRef 
   */
  public static openDialog(dialogRef: MutableRefObject<HTMLDialogElement | null>) {
    if (dialogRef && dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  /**
   * Hides dialog.
   * @param dialogRef 
   */
  public static closeDialog(dialogRef: MutableRefObject<HTMLDialogElement | null>) {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  /**
   * Create a key to store user responses.
   * @param iteratorResult formData iterator result.
   * @param itemsAlreadySet previous items set.
   */
  public static setLocalStorage(
		iteratorResult: IteratorResult<[string, FormDataEntryValue], any>,
		itemsAlreadySet?: string | null | undefined,
    key?: string | null | undefined,
	) {
		let item = "";

		if (itemsAlreadySet) {
			const prevItem = JSON.parse(itemsAlreadySet);
			item = JSON.stringify({
				...prevItem,
				[iteratorResult.value[0]]: iteratorResult.value[1],
			});
		} else {
			item = JSON.stringify({
				[iteratorResult.value[0]]: iteratorResult.value[1],
			});
		}

		globalThis.localStorage.setItem(
			key ?? "userResponses",
			item,
		);
	};

}