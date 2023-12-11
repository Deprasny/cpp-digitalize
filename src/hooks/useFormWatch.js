import { watch } from "vue";

const useFormWatch = (watchedProperty, updateCallback) => {
    watch(
        () => watchedProperty,
        (newValue) => {
            if (newValue) {
                updateCallback(newValue);
            }
        }
    );
};

export default useFormWatch;
