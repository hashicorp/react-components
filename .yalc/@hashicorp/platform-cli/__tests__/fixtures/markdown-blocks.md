# Markdown Blocks Test

This is a test file for the markdown blocks feature of `nextjs-scripts`. The purpose of this feature is to make it easy to centrally locate highly repeated blocks of readme information, and make it simple to update the blocks centrally and distribute them out to all of the readmes they are used in.

Here's an EJS-style variable outside the context of a markdown block: <% foo %>

A block is about to begin below:

<!-- BEGIN: __test__/include-1 -->
<!-- END: __test__/include-1 -->

Now we're back to some normal text.

# A Headline

Ok, now let's get into another block!

<!-- BEGIN: __test__/include-2 -->
<!-- END: __test__/include-2 -->

That's all for this test!
