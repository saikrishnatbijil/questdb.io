/**
 * This script should be executed by `lint-staged` before commiting
 * Therefore script assumes that file path exists in `process.argv`
 */

const path = require("path")
const fs = require("fs")
const imagemin = require("imagemin")
const imageminGifsicle = require("imagemin-gifsicle")
const imageminSvgo = require("imagemin-svgo")
const sharp = require("sharp")

const filePath = process.argv[2]
const src = "static/img"
const dist = src
const log = (msg) => process.stdout.write(msg)

const withSharp = async (filePath, ext) => {
  log(`Optimising ${filePath} with \`sharp()\`... `)

  // `sharp` cannot overwrite the original file, so we need to create a temporary one
  const tmpFilePath = `${filePath}.tmp`

  const jpgOptions = {
    progressive: true,
    quality: 75,
  }

  const formatOptions = {
    jpg: jpgOptions,
    jpeg: jpgOptions,
    webp: {
      lossless: true,
      quality: 100,
    },
  }

  await sharp(filePath)
    .resize({
      width: 1000,
      height: 1000,
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat(ext, formatOptions[ext])
    .toFile(tmpFilePath)
    .then(() => {
      log("OK!\n")

      // Move the temporary file to the original file path
      fs.renameSync(tmpFilePath, filePath)
    })
    .catch((err) => {
      log("ERROR!\n")
      console.error(err)
    })
}

const withImagemin = async (filePath) => {
  log(`Optimising ${filePath} with \`imagemin()\`... `)

  imagemin([filePath], {
    plugins: [
      imageminGifsicle({
        interlaced: true,
        optimizationLevel: 2,
      }),
      imageminSvgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false },
          { removeUnknownsAndDefaults: false },
          { convertShapeToPath: false },
          { inlineStyles: false },
        ],
      }),
    ],
  }).then((files) =>
    files.forEach(async (file) => {
      let { dir, name, ext } = path.parse(file.sourcePath)
      log("OK!\n")
      file.destinationPath = `${dir.replace(src, dist)}/${name}${ext}`
      fs.mkdirSync(path.dirname(file.destinationPath), { recursive: true })
      fs.writeFileSync(file.destinationPath, file.data)
    }),
  )
}

const makeThumbnail = async (filePath, thumbPath) => {
  const dirname = path.dirname(filePath)
  const outputPath = path.join(dirname, thumbPath)

  await sharp(filePath)
    .resize(500, 300)
    .toFormat("webp", { lossless: false })
    .toFile(outputPath)
    .then(() => {
      log(`Created thumbnail ${outputPath}!\n`)
    })
    .catch((err) => {
      log(`Error creating thumbnail for ${filePath}!\n`)
      console.log(err)
    })
}

const main = async () => {
  if (filePath.endsWith("banner.thumb.webp")) {
    log("Skipping optimisation of banner.thumb.webp\n")
    return
  }

  if (filePath.endsWith("banner.webp")) {
    await makeThumbnail(filePath, "banner.thumb.webp")
  }

  const fileExtension = path.extname(filePath).toLowerCase().replace(".", "")

  const optimisers = {
    "jpe?g|png|webp": withSharp,
    "gif|svg": withImagemin,
  }

  const optimiseFunc = Object.entries(optimisers).find(([key]) => {
    const regex = new RegExp(key)
    return regex.test(fileExtension)
  })

  if (optimiseFunc) {
    await optimiseFunc[1](filePath, fileExtension)
  } else {
    console.log(`No optimise function found for ${fileExtension} file`)
  }
}

main()
